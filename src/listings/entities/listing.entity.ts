import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Review } from '../../bookings/entities/review.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  noOfPeople: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column('decimal')
  price: number;

  @OneToMany(() => Booking, (booking) => booking.listing)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.listing)
  reviews: Review[];
}