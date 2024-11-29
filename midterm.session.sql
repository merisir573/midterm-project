-- Create the review table
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES booking(id),  -- Foreign key referencing the booking table
    listing_id INT REFERENCES listing(id),  -- Foreign key referencing the listing table
    rating INT CHECK (rating >= 1 AND rating <= 5),  -- Rating between 1 and 5
    comment TEXT
);

-- Insert randomized values into the review table
INSERT INTO review (booking_id, listing_id, rating, comment)
SELECT
    FLOOR(RANDOM() * 100 + 1)::INT,  -- Random booking_id from 1 to 100 (assuming 100 bookings)
    FLOOR(RANDOM() * 100 + 1)::INT,  -- Random listing_id from 1 to 100 (assuming 100 listings)
    FLOOR(RANDOM() * 5 + 1)::INT,    -- Random rating between 1 and 5
    (ARRAY[
        'Great place!', 'Had an amazing time.', 'Would visit again.', 'Not as expected.', 
        'Very comfortable and spacious.', 'Decent stay.', 'Could use some improvements.',
        'Loved the location and service!', 'Not worth the price.', 'Perfect for a weekend getaway.'
    ])[FLOOR(RANDOM() * 10 + 1)::INT] AS comment  -- Random comment from a predefined list
FROM
    generate_series(1, 100);  -- Generate 100 review records
