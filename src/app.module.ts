import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsModule } from './listings/listings.module';
import { BookingsModule } from './bookings/bookings.module';
import { Listing } from './listings/entities/listing.entity';
import { Booking } from './bookings/entities/booking.entity';
import { Review } from './bookings/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-ct4s6k08fa8c73bqursg-a.oregon-postgres.render.com', // your PostgreSQL host
      port: 5432, // your PostgreSQL port
      username: 'midterm_postgresql_merisir_user', // your PostgreSQL username
      password: 'K7D01WmZIP4Z0u3hNuYOPKQ3X4MeSMqm', // your PostgreSQL password
      database: 'midterm_postgresql_merisir', // your PostgreSQL database
      entities: [Listing, Booking, Review],
      synchronize: true, // Automatically create database tables (set to false in production)
    }),ListingsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
