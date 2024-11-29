import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { BookingsService } from '../bookings/bookings.service';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
    private readonly bookingsService: BookingsService,
  ) {}

  async insertListing(body: { noOfPeople: number; country: string; city: string; price: number }) {
    const listing = this.listingsRepository.create(body);
    await this.listingsRepository.save(listing);
    return { status: 'Successful', data: listing };
  }

  async queryListings(query: { country: string; city: string; noOfPeople: number; dateFrom: string; dateTo: string }) {
    const filteredListings = await this.listingsRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.bookings', 'booking')
      .where('listing.country = :country', { country: query.country })
      .andWhere('listing.city = :city', { city: query.city })
      .andWhere('listing.noOfPeople <= :noOfPeople', { noOfPeople: query.noOfPeople })
      .andWhere(
        `(booking.dateFrom >= :dateFrom AND booking.dateFrom <= :dateTo) OR (booking.dateTo >= :dateFrom AND booking.dateTo <= :dateTo)`,
        { dateFrom: query.dateFrom, dateTo: query.dateTo },
      )
      .getMany();

    return { status: 'Successful', listings: filteredListings };
  }

  async queryListingsByRating(query: { country: string; city?: string; rating: number }) {
    const { country, city, rating } = query;

    const filteredListings = await this.listingsRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.reviews', 'review')
      .where('listing.country = :country', { country })
      .andWhere('listing.city = :city', { city })
      .groupBy('listing.id')
      .having('AVG(review.rating) >= :rating', { rating })
      .getMany();

    return { status: 'Successful', listings: filteredListings };
  }
}
