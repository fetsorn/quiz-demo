{
  inputs = { nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05"; };
  outputs = inputs@{ nixpkgs, ... }:
    let
      eachSystem = systems: f:
        let
          op = attrs: system:
            let
              ret = f system;
              op = attrs: key:
                let
                  appendSystem = key: system: ret: { ${system} = ret.${key}; };
                in attrs // {
                  ${key} = (attrs.${key} or { })
                    // (appendSystem key system ret);
                };
            in builtins.foldl' op attrs (builtins.attrNames ret);
        in builtins.foldl' op { } systems;
      defaultSystems = [ "x86_64-linux" "aarch64-darwin" ];
    in eachSystem defaultSystems (system:
      let
        pkgs = import nixpkgs { inherit system; };
        basename = "quiz-demo";
        src = pkgs.nix-gitignore.gitignoreSource [ ".git" ] ./.;
        package = (pkgs.lib.importJSON (src + "/package.json"));
        nodeVersion =
          builtins.elemAt (pkgs.lib.versions.splitVersion pkgs.nodejs.version)
          0;
        webappDrv = buildMode:
          pkgs.mkYarnPackage rec {
            name = package.name;
            version = package.version;
            src = pkgs.nix-gitignore.gitignoreSource [ ".git" ] ./.;
            preConfigure = ''
              substituteInPlace package.json --replace "webpack --config webpack.web.config.mjs" "yarn exec webpack-cli -- --mode=development --config webpack.web.config.mjs --env buildMode=${buildMode}"
            '';
            buildPhase = ''
              yarn run webapp:build
            '';
            installPhase = "cp -r ./deps/${name}/release/renderer $out";
            distPhase = "true";
          };
        webapp = webappDrv "webapp";
      in rec {
        packages = { inherit webapp; };
        defaultPackage = packages.webapp;
        devShell =
          pkgs.mkShell { nativeBuildInputs = with pkgs; [ nodejs yarn ]; };
      });
}
