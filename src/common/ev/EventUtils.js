import JwtUtils from '@/common/JwtUtils';

const EventUtils = {
  eventIdCheck: async (to, from, next) => {
    const regexp = /^[0-9]*$/;
    if (!regexp.test(to.params.eventId)) {
      next("/404");
    }
    next();
  },
};

export default EventUtils;
