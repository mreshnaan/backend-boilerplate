import { ApiResponse } from '@/utils/api.response.utils';

describe('ApiResponse Utility', () => {
  describe('success', () => {
    it('should create a success response without data', () => {
      const response = ApiResponse.success('Operation successful');

      expect(response).toEqual({
        success: true,
        message: 'Operation successful',
      });
    });

    it('should create a success response with data', () => {
      const data = { id: '123', name: 'Test' };
      const response = ApiResponse.success('User fetched', data);

      expect(response).toEqual({
        success: true,
        message: 'User fetched',
        data: { id: '123', name: 'Test' },
      });
    });

    it('should create a success response with meta', () => {
      const meta = { page: 1, limit: 10 };
      const response = ApiResponse.success('Success', null, meta);

      expect(response).toEqual({
        success: true,
        message: 'Success',
        meta: { page: 1, limit: 10 },
      });
    });
  });

  describe('error', () => {
    it('should create an error response without error details', () => {
      const response = ApiResponse.error('Something went wrong');

      expect(response).toEqual({
        success: false,
        message: 'Something went wrong',
      });
    });

    it('should create an error response with error details', () => {
      const error = { code: 'ERR001', details: 'Invalid input' };
      const response = ApiResponse.error('Validation failed', error);

      expect(response).toEqual({
        success: false,
        message: 'Validation failed',
        error: { code: 'ERR001', details: 'Invalid input' },
      });
    });
  });

  describe('paginated', () => {
    it('should create a paginated response with correct meta', () => {
      const data = [{ id: '1' }, { id: '2' }];
      const response = ApiResponse.paginated('Users fetched', data, 1, 10, 25);

      expect(response).toEqual({
        success: true,
        message: 'Users fetched',
        data: [{ id: '1' }, { id: '2' }],
        meta: {
          page: 1,
          limit: 10,
          total: 25,
          totalPages: 3,
        },
      });
    });

    it('should calculate total pages correctly', () => {
      const data = [{ id: '1' }];
      const response = ApiResponse.paginated('Data fetched', data, 1, 10, 100);

      expect(response.meta?.totalPages).toBe(10);
    });
  });
});
