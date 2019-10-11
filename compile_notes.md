## hard links

These directories are hard links:

snet/
schemes/
spellfiles/
aoa/
frequency/

They are synched with snafu-py. If deleted here, they are deleted for snafu-py instead!
They are made using https://github.com/selkhateeb/hardlink
To remove them, use `hln -u [dir]` instead

Hard links are used to assist with github synching without maintaining multiple separate copies



## compiling interface.py with py2app

cd py
rm -rf dist             # maybe unnecessary?
sudo ./build_py2app.sh

* must be using python.org python, not Apple python

* note: may have to use scipy==0.14 if "ValueError: New Mach-O header is too large to relocate in ..." shows when compiling


## notes on packaging/distribution nwjs app without SDK

* install phoenix-builder (https://github.com/evshiron/nwjs-builder-phoenix) if not installed locally
    * npm install nwjs-builder-phoenix --save-dev
    

* update nwjs/snafu version in package.json?

* set flag in app.js to nwjs-app

sudo rm -rf dist    # remove old version
npm run dist        # compile new version

* compiling nwjs breaks compiled python interface (dunno why)-- __manually copy interface.app to compiled nwjs version__
* might need to chmod +x interface in interface.app, but hopefully not
* manually remove large files? (dedyne.snet, BEAGLEdata.mat)
* zip up folder (use mac gui zip, smaller than terminal zip)
* multiple instances of "nwjs Framework" can be symlinked
    1@ snafu.app/Contents/Versions/64.0.3282.119/nwjs Framework.framework/Versions/A
    2@ snafu.app/Contents/Versions/64.0.3282.119/nwjs Framework.framework/
    
* ~ 270mb uncompressed, ~104mb compressed


## web version set-up

run ~/.update-snafu.sh on luke
if alab.psych.wisc.edu/snafu-dev looks ok, run ~/.update-snafu.sh live

misc notes:
    - make sure "web" mode is enabled (see top of js/app.js)
    - py/rw, /snet, /schemes folders exist
    - all python packages are installed (networkx, scipy, etc)
    - /uploads and /output are  777

## compiling on windows with pyinstaller (no more py2exe)

* successfully compiled using python 2.7
* python 3 is not yet tested

* if not installed already
pip install pyinstaller 

* compilation:
cd py
pyinstaller interface.py 	# should take 5-10 minutes 
cd ..
npm run dist-win

* and then the compiled version should appear in ./dist/
* ~ 271mb unzipped, ~110mb zipped (using 7-Zip with smallest size specification)