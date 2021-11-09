import CookieUtils from '@/common/CookieUtils';

const DayBreak = {
    isDayBreak() {
        const storId = CookieUtils.getCookie('STOR_ID');
        if (storId == "2287") {
            return true;
        } else {
            return false;
        }
    },
};

export default DayBreak;
