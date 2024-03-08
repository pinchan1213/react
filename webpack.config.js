// 本番環境か開発環境かを判定 productionでなければ開発モードになる
let debug = process.env.NODE_ENV !== "production";
// webpack自体をインポート
let webpack = require('webpack');
// ファイルパスを操作するためのNode.jsの組み込みモジュールをインポート
let path = require('path');

// webpackの設定をエクスポートしている
module.exports = {
  // ビルドの起点となるディレクトリを指定 pathのjoinメソッドを使用して引数として渡されたパスの断片を結合して新しいパス文字列を生成する
  context:path.join(__dirname,"src"),
  entry:"./js/client.js",
  module:{
    rules:[{
      // .jsで終わる全てのファイルを対象にする
      test:/\.js?$/,
      // node_modulesとbower_componentsディレクトリをトランスパイルの対象から除外する
        exclude:/(node_modules|bower_components)/,
        use:[{
          // ReactのJSX構文と最新のJavascript構文を古いブラウザでも動作できるように変換する
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-react','@babel/preset-env']
          }
        }]
    }]
  },
  output:{
    // 出力ファイルはsrcサブディレクトリに保存される
    path:__dirname + '/src/',
    // srcサブディレクトリにclient.min.jsという名前で出力されるように設定する
    filename:'client.min.js'
  },
  // webpackがビルドプロセス中に使用するプラグインの配列を指定する
  // debugがtrueの場合（開発環境の場合）プラグインなし（空の配列）
  plugins : debug ? [] :[
    // webpackのプラグインで頻繁に使用されるモジュールに短いidを割り当てることで結果のバンドルサインを小さくする
    new webpack.optimize.OccurrenceOrderPlugin(),
    // webpackのプラグインでjavascriptのコードを最適化
    new webpack.optimize.UglifyJsPlugin({ mangle:false,sourcemap:false }),
  ]
}