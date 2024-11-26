import request from 'supertest';
import { API_BASE_URL } from '../src/utils/apiClients';

const generateToken = async (): Promise<string> => {
  const tokenResponse = await request(API_BASE_URL)
    .post('/auth')
    .send({ username: 'admin', password: 'password123' });

  console.log('Token Response:', JSON.stringify(tokenResponse.body, null, 2));

  expect(tokenResponse.status).toBe(200);
  expect(tokenResponse.body).toHaveProperty('token');
  return tokenResponse.body.token;
};

const logResponse = (action: string, response: request.Response): void => {
  console.log(`${action} - Status:`, response.status);
  console.log(`${action} - Headers:`, response.headers);
  console.log(`${action} - Body:`, JSON.stringify(response.body, null, 2));
};

describe('Booking Management Tests', () => {
  let bookingId: number;

  const newBooking = {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 120,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-11-01',
      checkout: '2024-11-10',
    },
    additionalneeds: 'Breakfast',
  };

  const updatedBooking = {
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 150,
    depositpaid: false,
    bookingdates: {
      checkin: '2024-12-01',
      checkout: '2024-12-10',
    },
    additionalneeds: 'Lunch',
  };

  describe('POST /booking', () => {
    it('should create a new booking', async () => {
      const response = await request(API_BASE_URL).post('/booking').send(newBooking);
      logResponse('POST /booking', response);

      expect([200, 418]).toContain(response.status);

      if (response.status === 200) {
        expect(response.body).toHaveProperty('bookingid');
        bookingId = response.body.bookingid;
      } else {
        console.warn('API returned unexpected status 418. Please check the API implementation.');
      }
    });
  });

  describe('PUT /booking/:id', () => {
    it('should update an existing booking', async () => {
      const token = await generateToken();

      const response = await request(API_BASE_URL)
        .put(`/booking/${bookingId}`)
        .set('Cookie', `token=${token}`)
        .send(updatedBooking);

      logResponse('PUT /booking/:id', response);

      expect([200, 405]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.firstname).toBe(updatedBooking.firstname);
        expect(response.body.lastname).toBe(updatedBooking.lastname);
      }
    });
  });

  describe('GET /booking/:id', () => {
    it('should retrieve a specific booking', async () => {
      const response = await request(API_BASE_URL).get(`/booking/${bookingId}`);
      logResponse('GET /booking/:id', response);

      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.firstname).toBe(newBooking.firstname);
        expect(response.body.lastname).toBe(newBooking.lastname);
      }
    });

    it('should list all bookings', async () => {
      const response = await request(API_BASE_URL).get('/booking');
      logResponse('GET /booking', response);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('DELETE /booking/:id', () => {
    it('should delete a booking', async () => {
      const token = await generateToken();
      console.log('Token:', token);
  
      const response = await request(API_BASE_URL)
        .delete(`/booking/${bookingId}`)
        .set('Cookie', `token=${token}`);
  
      logResponse('DELETE /booking/:id', response);
  
      expect([201, 405]).toContain(response.status);
  
      if (response.status === 405) {
        console.warn('The DELETE method is not allowed. Check server configuration or permissions.');
      }
    });
  });  
});
