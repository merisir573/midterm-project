import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { Listing } from './entities/listing.entity';
import { BookingsService } from '../bookings/bookings.service';
import { Booking } from '../bookings/entities/booking.entity';
import { Review } from '../bookings/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Booking, Review])],
  controllers: [ListingsController],
  providers: [ListingsService, BookingsService],
})
export class ListingsModule {}
