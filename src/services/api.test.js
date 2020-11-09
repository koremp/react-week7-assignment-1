import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  postLogin,
  postReview,
} from './api';

import REGIONS from '../../fixtures/regions';
import CATEGORIES from '../../fixtures/categories';
import RESTAURANTS from '../../fixtures/restaurants';
import RESTAURANT from '../../fixtures/restaurant';

describe('api', () => {
  const mockFetch = (data, status) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
      status,
    });
  };

  describe('fetchRegions', () => {
    beforeEach(() => {
      mockFetch(REGIONS);
    });

    it('returns regions', async () => {
      const regions = await fetchRegions();

      expect(regions).toEqual(REGIONS);
    });
  });

  describe('fetchCategories', () => {
    beforeEach(() => {
      mockFetch(CATEGORIES);
    });

    it('returns categories', async () => {
      const categories = await fetchCategories();

      expect(categories).toEqual(CATEGORIES);
    });
  });

  describe('fetchRestaurants', () => {
    beforeEach(() => {
      mockFetch(RESTAURANTS);
    });

    it('returns restaurants', async () => {
      const restaurants = await fetchRestaurants({
        regionName: '서울',
        categoryId: 1,
      });

      expect(restaurants).toEqual(RESTAURANTS);
    });
  });

  describe('fetchRestaurant', () => {
    beforeEach(() => {
      mockFetch(RESTAURANT);
    });

    it('returns restaurants', async () => {
      const restaurant = await fetchRestaurant({ restaurantId: 1 });

      expect(restaurant).toEqual(RESTAURANT);
    });
  });

  describe('postLogin', () => {
    beforeEach(() => {
      mockFetch({ accessToken: 'token' });
    });

    it('returns access token', async () => {
      const accessToken = await postLogin({ email: 'tester@example.com', password: 'test' });

      expect(accessToken).toEqual('token');
    });
  });

  describe('postReview', () => {
    context('when success', () => {
      beforeEach(() => {
        mockFetch(null, 201);
      });

      it('returns status 201', async () => {
        await postReview({
          score: 5,
          description: '매일 사먹는 제품입니다.',
          accessToken: 'token',
          restaurantId: 8,
        });

        expect(fetch).toBeCalled();
      });
    });

    context('when failed', () => {
      beforeEach(() => {
        mockFetch(null, 400);
      });

      it('returns status 400', async () => {
        const catchFn = jest.fn();

        await postReview({
          score: 5,
          description: '매일 사먹는 제품입니다.',
          accessToken: 'token',
          restaurantId: 8,
        }).catch(catchFn);

        expect(catchFn).toBeCalled();
      });
    });
  });
});
