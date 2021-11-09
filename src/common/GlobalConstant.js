export default {
    mallNm: {
        '1': 'GS 프레시몰',
        '11': '달리살다',
        '20': '심플리쿡',
        '301': 'GS SHOP',
        '302': '더반찬',
        '303': '얌테이블',
        '304': '랄라블라',
        '305': '쿠캣',
        '306': '어바웃펫(펫츠비)'
    },
    useLocationHrefArr: ['1', '11', '20'], // [Link시 location.href를 사용해야하는 몰ID]

    getMallNm(mallId) {
        return this.mallNm[mallId] || '';
    },
};
