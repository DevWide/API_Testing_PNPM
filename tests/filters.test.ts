import request from 'supertest';
import apiClient from '@utils/apiClients';

describe('Booking Filters and Search Tests', () => {
  it('should filter bookings by firstname', async () => {
    const response = await request(apiClient.defaults.baseURL)
      .get('/booking?firstname=John');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('bookingid');
    }
  });

  it('should filter bookings by check-in date', async () => {
    const response = await request(apiClient.defaults.baseURL)
      .get('/booking?checkin=2024-11-01');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('bookingid');
    }
  });

  it('should filter bookings by check-out date', async () => {
    const response = await request(apiClient.defaults.baseURL)
      .get('/booking?checkout=2024-11-10');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('bookingid');
    }
  });
});
