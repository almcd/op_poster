OpenPaths Poster Generator
===========

A script to generate a print-ready poster in InDesign of your OpenPaths location data.


## Requirements
You will need a copy of Adobe InDesign installed on your computer, along with the Basil.js library and some OpenPaths data.
* Adobe InDesign http://www.adobe.com/uk/products/indesign.html
* Basil.js http://basiljs.ch/
* OpenPaths https://openpaths.cc/


## Setup
1. Download and place the `op_poster` folder inside the `user` directory of your Basil.js installation.
1. Download your OpenPaths data from the Openpaths website. CSV or JSON is acceptable.
1. Place your OpenPaths CSV or JSON file in the `data` folder.
1. Open `map.jsx` in a text editor and update `data_source` to the name of your OpenPaths data CSV or JSON file.
1. Create a new A3 document in InDesign with portrait orientation and save it to the `map` folder. All other settings can be left as default.
1. Run the `map.jsx` script from the `Scripts` palette in InDesign.


## Example Output
![](http://imageurl)


## License
The MIT License (MIT)

Copyright (c) 2014 Alistair McDonald

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.