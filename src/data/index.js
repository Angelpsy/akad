const data = {
    'index': {
        'history': {
            'img': require(`../pages/index/assets/content/content-history.jpg`),
        },
        'choose': {
            'img': require(`../pages/index/assets/content/content-choose.jpg`),
            'advantages': [
                {
                    'icon': require(`../common/icons/svg/infinite.svg`),
                    'title': 'Unlimited options',
                    'list': [
                        'Branding',
                        'Design & Copywriting',
                        'Concept development',
                        'User Experience',
                    ],
                },
                {
                    'icon': require(`../common/icons/svg/cart.svg`),
                    'title': 'E-commerce',
                    'list': [
                        'Prototyping',
                        'Technical Consulting',
                        'Web applications',
                        'Quality testing',
                    ],
                },
                {
                    'icon': require(`../common/icons/svg/shuffle.svg`),
                    'title': 'Design & development',
                    'list': [
                        'Information architecture',
                        'Interface design',
                        'Product Design',
                        'Integrated ad Companies',
                    ],
                },
                {
                    'icon': require(`../common/icons/svg/options.svg`),
                    'title': 'Customizable design',
                    'list': [
                        'Information architecture',
                        'Interface design',
                        'Product Design',
                        'Integrated ad Companies',
                    ],
                },
            ],
        },
        'portfolio': {
            'items': [
                {
                    'id': 'webdesign',
                    'category': 'Webdesign',
                    'imgs': [
                        require(`../pages/index/assets/content/content-portfolio-1.jpg`),
                        require(`../pages/index/assets/content/content-portfolio-2.jpg`),
                    ],
                },
                {
                    'id': 'graphicdesign',
                    'category': 'Graphic design',
                    'imgs': [
                        require(`../pages/index/assets/content/content-portfolio-3.jpg`),
                        require(`../pages/index/assets/content/content-portfolio-4.jpg`),
                    ],
                },
                {
                    'id': 'fashion',
                    'category': 'Fashion',
                    'imgs': [
                        require(`../pages/index/assets/content/content-portfolio-5.jpg`),
                        require(`../pages/index/assets/content/content-portfolio-6.jpg`),
                    ],
                },
                {
                    'id': 'logodesign',
                    'category': 'Logo design',
                    'imgs': [
                        require(`../pages/index/assets/content/content-portfolio-7.jpg`),
                        require(`../pages/index/assets/content/content-portfolio-8.jpg`),
                    ],
                },
                {
                    'id': 'advertising',
                    'category': 'Advertising',
                    'imgs': [
                        require(`../pages/index/assets/content/content-portfolio-9.jpg`),
                    ],
                },
            ],
        },
    },
};

export default data;
