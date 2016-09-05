/**
 * Created by clf on 2016/7/29.
 */

var config={
    //mongodb连接地址
    db: 'mongodb://127.0.0.1:27017/shop',

    //jwt用于生成token的密钥
    secretKey:'clf',

    // 下面两个配置都是文件上传的配置

    // 7牛的access信息，用于文件上传
    qn_access: {
        accessKey: '76UfDCtldN5dMYUzMUvuTu9eftqJUdZY5qL1JxLV',
        secretKey: '19V1XVWHMPao4FerjgP88zzMjLibgul8a3rocwCX',
        bucket: 'shop',
        origin: 'obbapcolf.bkt.clouddn.com'
    },

    //上传文件大小
    file_limit: '1MB',

    //云片apikey，需要在云片的管理后台将网站加入白名单
    yunPianKey:'51626119fc375ea355a53864626975ac',

    //价格区间,区间以~相隔
    priceList:['不限','0~1000','1000~2000','2000~3000','3000~4000'],

    //品种列表，需要跟client的一样
    categoryList:['不限','苹果','小米','魅族','华为','三星'],

    //交易方式，需要跟client的一样
    tradeType:['不限','当面','快递']
};

module.exports=config;