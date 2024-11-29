import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Review } from './entities/review.entity';
import { Listing } from '../listings/entities/listing.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async bookStay(body: { listingId: number; namesOfPeople: string[]; dateFrom: string; dateTo: string }) {
    // Ensure namesOfPeople is stored as a comma-separated string in the database (if required)
    const namesOfPeople = body.namesOfPeople.join(', ');

    // Create the booking entity
    const booking = this.bookingsRepository.create({
      listingId: body.listingId,
      namesOfPeople: namesOfPeople,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
    });

    // Save the booking entity to the database
    await this.bookingsRepository.save(booking);

    return { status: 'Successful', data: booking };
  }

  async getBookingsForListing(listingId: number) {
    return this.bookingsRepository.find({ where: { listingId } });
  }

  async reviewStay(body: { bookingId: number; rating: number; comment: string }) {
    const booking = await this.bookingsRepository.findOne({ where: { id: body.bookingId } });
    if (!booking) {
      return { status: 'Error', message: 'Booking not found' };
    }

    const review = this.reviewsRepository.create({
      bookingId: body.bookingId,
      listingId: booking.listingId,
      rating: body.rating,
      comment: body.comment,
    });
    await this.reviewsRepository.save(review);

    return { status: 'Successful', data: review };
  }

  async getReviewsForListing(listingId: number) {
    return this.reviewsRepository.find({ where: { listingId } });
  }
}
