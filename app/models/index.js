// Example :
// controllers/home.js             ==> Home
// controllers/home.ver1_ver2.js   ==> HomeVer1Ver2
// controllers/admin/home.js       ==> AdminHome
// controllers/admin/front/home.js ==> AdminFrontHome

module.exports = function(app, mongoose) {

  var walkSync = function(dir, filelist, prefix) {
    if(dir[dir.length-1] != '/') dir = dir.concat('/');

    var fs    = fs || require('fs');
    var files = fs.readdirSync(dir);
    filelist  = filelist || {};
    prefix    = prefix || '';
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist, prefix+"_"+file);
      } else {
        filelist[prefix+"_"+file] = dir + file;
      }
    });
    return filelist;
  };

  var filelist = walkSync(__dirname);
  var excludes = ['index'];
  for (var i in filelist) {
    var name = i.toLowerCase();
    name = name.substr(0, name.lastIndexOf('.')); // Remove Extension
    name = name.replace(/[^A-Z0-9]+/ig, "_").replace(/(?:_| |\b)(\w)/g, function(str, p1){return p1.toUpperCase()});
    if(excludes.indexOf(name.toLowerCase()) > -1) continue;

    // ============ EXPORT & REQUIRE ============
    exports[name] = require(filelist[i])(app, mongoose);
  };

  return exports;
}
