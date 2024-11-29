import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';
import { Review } from '../../bookings/entities/review.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  listingId: number;

  @Column('text')
  namesOfPeople: string; // You can store this as a string, or consider using JSON if this is a list

  @Column()
  dateFrom: string;

  @Column()
  dateTo: string;

  @ManyToOne(() => Listing, (listing) => listing.bookings)
  listing: Listing;

  @OneToMany(() => Review, (review) => review.booking)
  reviews: Review[];
}