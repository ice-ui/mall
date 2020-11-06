import { request } from './request'
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
// 商品推荐信息接口
export function getRecommend() {
    return request({
        url: '/recommend',
    })
}
// 商品信息封装
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
            // 购物车展示的价格
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class GoodsParam {
    constructor(info, rule) {
        // 判断images里面是否有值
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
// 店铺信息封装
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}