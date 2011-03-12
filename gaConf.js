var gaConf = {}
gaConf.conf1 = {
 	//全般設定
	cnf : {
	//アカウント名 : UA-XXXXXX-Xを入力してください。
		account : "UA-XXXXXX-X",
	//ページレベルでのカスタム変数のスロット名を配列形式で入力してください。
		pageLevel : [1]
	},
	
	//コンテンツグループの設定
	cg : {
		//コンテンツグループに利用するカスタム変数のカテゴリを指定してください。
		category : "ContentGroup",
		//コンテンツグループのスコープを設定してください。（デフォルト3 -> PageLevel)
		scope : 3,
		//コンテンツグループを正規表現で指定してください
		//グループ名：/グループ定義/
		pages : {
			groupA : /.+sampling.+/,
			groupB : /ga_test.html$/,
			groupC : /\/test\/ga\//,
			topPage : /^\/$|^\/index.html$/
		}
	},
	
	//GETパラメータの取得
	getPar : {
		//カスタム変数のカテゴリ名を指定してください。
		category : "Parameter",
		//スコープを指定してください（デフォルト2 -> Session Level）
		scope : 2,
		//取得するパラメータ名を指定してください。
		paramName : "cid"
	},
	
	//コンバージョンユーザーの取得
	cv : {
		//カスタム変数のカテゴリ名を指定してください。		
		category : "conversed",
		//スコープを指定してください（デフォルト1 -> User Level）		
		scope : 1,
		//コンバージョンしたユーザーにつける名前を指定してください。		
		cvName : "conversed",
		//コンバージョンとするURLを正規表現で指定してください。
		urlString : [/\/test\/ga\/index\.html/, /\/test\/ga\/index2\.html/]
	},
	
	//オートリンクの設定
	autoLink : {
		//除外するドメイン名を配列で指定してください。
		internalDomain : ["www.sample.com"],
		//
		category : {
			offSite : "OffSiteLink",
			download : "DownLoadLink"
		},
		//取得するDLファイルを設定
		dlFiles : {
			emailLink : /mailto:(.+)$/i,
			pdf: /(.+\.pdf)$/i,
			zip: /(.+\.zip)$/i,
			PowerPoint: /(.+\.pptx?)$/i,
			Excel: /(.+\.xlsx?)$/i,
			Word: /(.+\.docx?)$/i
		}	
	},
	
	//timeToCompleteの設定
	timeToComplete : {
		//カスタム変数のアクション名を指定してください。
		action : "timeToComplete_TEST",
		//計測開始URLを配列で指定してください。
		startUrl : [/ga\/start1\.html$/, /ga\/start2\.html$/],
		//計測終了URLを配列で指定してください。
		endUrl : [/ga\/end1\.html$/, /ga\/end2\.html$/],
		//利用するcookie名を指定してください。
		cookieName : "_utmTimeToComp"
	},
	
	//ムービー閲覧時間取得の設定
	movie : {
		//カスタム変数で利用するカテゴリ名を指定してください。
		category : "WatchingTime", 
		//カスタム変数で利用するカテゴリ名を指定してください。
		action : "Movie1",
		//最大計測時間を指定してください（秒）
		maxTime : 300,
		//データ送信間隔を指定してください（秒）
		interval : 15
	},
	
	//Cross Domain用Trackingの設定
	allowLinker : {
		//許可するサイトのURLを指定してください。
		allow : ["www.sample.co.jp", "www.sample2.co.jp/"]
	}

};

//Second Tracker用の設定
gaConf.conf2 = {
};

