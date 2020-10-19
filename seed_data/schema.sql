drop table if exists jobs;

SET datestyle = 'SQL, MDY';

CREATE TABLE jobs (
  id serial,
  company VARCHAR(40),
   position VARCHAR(40),
   application_link VARCHAR(100),
   resources_link VARCHAR(100),
   notes VARCHAR(200),
   interest_level INT,
   phone_screen DATE,
   interviews DATE,
   add_date DATE DEFAULT CURRENT_DATE
 );
