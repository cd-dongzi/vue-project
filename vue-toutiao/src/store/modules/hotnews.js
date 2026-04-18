import Vue from 'vue'

const hotnews = {
    state: {
        hotNewsList: [
            {
                id: 1,
                title: '社会新闻',
                list: [
                    {
                        id: 101,
                        title: '全国多地迎来降温天气，部分地区降雪',
                        intro: '据中央气象台消息，受强冷空气影响，我国北方多地将迎来大幅度降温，部分地区可能出现降雪天气。',
                        source: '央视新闻',
                        comment: 1256,
                        time: '2小时前',
                        images: []
                    },
                    {
                        id: 102,
                        title: '新型冠状病毒疫苗接种工作有序推进',
                        intro: '全国各地积极推进新冠疫苗加强针接种工作，为疫情防控提供坚实保障。',
                        source: '人民日报',
                        comment: 892,
                        time: '3小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hospital%20vaccination%20center%20with%20people%20waiting%20in%20line%20modern%20medical%20facility&image_size=square'
                        ]
                    },
                    {
                        id: 103,
                        title: '春运首日全国铁路发送旅客超千万人次',
                        intro: '2026年春运正式拉开帷幕，首日全国铁路预计发送旅客1050万人次，同比增长15%。',
                        source: '新华社',
                        comment: 2341,
                        time: '5小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=busy%20train%20station%20during%20spring%20festival%20travel%20rush%20chinese%20style&image_size=square',
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20speed%20train%20modern%20china%20railway%20station%20platform&image_size=square',
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=passengers%20carrying%20luggage%20at%20train%20station%20happy%20reunion&image_size=square'
                        ]
                    },
                    {
                        id: 104,
                        title: '教育双减政策实施两周年成效显著',
                        intro: '双减政策实施两年以来，学生学业负担明显减轻，校外培训机构治理取得阶段性成效。',
                        source: '中国教育报',
                        comment: 567,
                        time: '8小时前',
                        images: []
                    },
                    {
                        id: 105,
                        title: '一线城市二手房市场回暖迹象明显',
                        intro: '最新数据显示，北京、上海、广州、深圳四大一线城市二手房成交量环比上涨，市场信心逐步恢复。',
                        source: '经济日报',
                        comment: 1893,
                        time: '10小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20city%20residential%20buildings%20real%20estate%20china&image_size=square'
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: '娱乐新闻',
                list: [
                    {
                        id: 201,
                        title: '春节档电影票房突破百亿大关',
                        intro: '2026年春节档电影市场异常火爆，总票房已突破100亿元，刷新历史记录。',
                        source: '娱乐周刊',
                        comment: 5678,
                        time: '1小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinema%20movie%20theater%20chinese%20new%20year%20film%20festival%20red%20decorations&image_size=square'
                        ]
                    },
                    {
                        id: 202,
                        title: '知名歌手全新专辑上线首日销量破百万',
                        intro: '华语乐坛天王级歌手发布最新专辑，上线仅24小时销量就突破100万张，粉丝热情高涨。',
                        source: '音乐先锋',
                        comment: 3456,
                        time: '4小时前',
                        images: []
                    },
                    {
                        id: 203,
                        title: '热门综艺节目收视率创新高',
                        intro: '某卫视王牌综艺节目最新一期收视率突破5%，同时段市场占有率超过20%，稳居第一。',
                        source: '综艺报',
                        comment: 2345,
                        time: '6小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tv%20studio%20variety%20show%20stage%20lights%20audience%20chinese%20entertainment&image_size=square'
                        ]
                    },
                    {
                        id: 204,
                        title: '年度颁奖典礼红毯星光熠熠',
                        intro: '2025年度娱乐盛典在北京举行，众多明星盛装出席，红毯环节引发网友热议。',
                        source: '时尚芭莎',
                        comment: 8901,
                        time: '12小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20carpet%20event%20celebrities%20awards%20ceremony%20elegant%20dresses%20spotlights&image_size=square',
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20trophy%20award%20statue%20stage%20curtain%20elegant&image_size=square'
                        ]
                    },
                    {
                        id: 205,
                        title: '新生代演员凭借新剧爆红网络',
                        intro: '某95后新生代演员因在热播剧中的精彩表现迅速走红，微博粉丝一周暴涨500万。',
                        source: '新浪娱乐',
                        comment: 12345,
                        time: '15小时前',
                        images: []
                    }
                ]
            },
            {
                id: 3,
                title: '国际新闻',
                list: [
                    {
                        id: 301,
                        title: '联合国气候峰会达成重要共识',
                        intro: '第30届联合国气候变化大会在阿联酋迪拜闭幕，与会各国就减排目标达成重要共识。',
                        source: '新华社',
                        comment: 4567,
                        time: '2小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=united%20nations%20climate%20conference%20world%20leaders%20meeting%20global%20environment&image_size=square'
                        ]
                    },
                    {
                        id: 302,
                        title: '美联储宣布维持利率不变',
                        intro: '美国联邦储备委员会宣布将联邦基金利率目标区间维持在5.25%-5.5%不变，符合市场预期。',
                        source: '华尔街日报',
                        comment: 2345,
                        time: '5小时前',
                        images: []
                    },
                    {
                        id: 303,
                        title: '日本宣布新一轮经济刺激计划',
                        intro: '日本政府宣布总额达30万亿日元的经济刺激计划，旨在应对通胀压力和提振国内消费。',
                        source: '日经新闻',
                        comment: 1234,
                        time: '8小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tokyo%20financial%20district%20japan%20economy%20modern%20skyscrapers%20night&image_size=square'
                        ]
                    },
                    {
                        id: 304,
                        title: '欧盟通过数字市场法案',
                        intro: '欧盟理事会正式通过《数字市场法案》，旨在规范大型科技公司行为，促进市场公平竞争。',
                        source: '路透社',
                        comment: 3456,
                        time: '10小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=european%20union%20flag%20brussels%20parliament%20building%20official%20meeting&image_size=square'
                        ]
                    },
                    {
                        id: 305,
                        title: '全球芯片供应链持续紧张',
                        intro: '受地缘政治和产能限制影响，全球芯片供应紧张状况预计将持续到2026年下半年。',
                        source: '金融时报',
                        comment: 5678,
                        time: '18小时前',
                        images: [
                            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=semiconductor%20chip%20manufacturing%20factory%20silicon%20wafer%20technology%20clean%20room&image_size=square'
                        ]
                    }
                ]
            }
        ],
        hotNewsIndex: 0,
        hotNewsLoading: false,
        hotNewsEnd: false
    },
    actions: {
        getHotNewsList ({commit, state}, params) {
            let obj = state.hotNewsList.find(v => v.id == params.id)
            if (obj.list) return
            state.hotNewsLoading = true
            return new Promise( (resolve, reject) => {
                state.hotNewsLoading = false
                resolve(obj.list)
            })
        }
    },
    mutations: {
        GETHOTNEWSLIST (state, list) {
            state.hotNewsList[state.hotNewsIndex].list = list
            Vue.prototype.$set(state.hotNewsList, state.hotNewsIndex, state.hotNewsList[state.hotNewsIndex])
        }
    }
}

export default hotnews
