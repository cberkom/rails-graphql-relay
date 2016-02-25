FROM ruby:2.2.4
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get update -qq \
 		&& apt-get install -y build-essential \
 													libpq-dev \
 													nodejs \
 		&& apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN npm install webpack -g
RUN mkdir /www
WORKDIR /www
CMD npm install && bundle install && rake db:migrate && rails s -b 0.0.0.0 -p 80