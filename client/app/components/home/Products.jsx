import React from 'react';
import Product from './Product'

export default class Products extends React.Component {
    render() {
        let data=[
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            },
            {
                imgSrc:'http://192.168.3.7:8081/avatar/o/121/14589724391397.jpg',
                title:'你手机的飞机',
                digest:'121215jsdjlfkj 角色等级分类'

            }
        ];
        var productsList = data.map(function (item,idx) {
            return (
                <Product imgSrc={item.imgSrc} key={idx} title={item.title} digest={item.digest}></Product>
            );
        });

        return (
            <div className="m-t-0 products">
                {productsList}
                <a className="text-center more-link" href="javascript:void(0);">查看更多</a>
            </div>
        );
    }
}
