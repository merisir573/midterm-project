import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column()
  listingId: number;

  @Column()
  rating: number;

  @Column('text')
  comment: string;

  @ManyToOne(() => Booking, (booking) => booking.reviews)
  booking: Booking;

  @ManyToOne(() => Listing, (listing) => listing.reviews)
  listing: Listing;
}