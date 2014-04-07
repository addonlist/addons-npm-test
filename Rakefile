#!/usr/bin/env ruby

namespace :addons do
  namespace :heroku do
    desc 'addons:heroku:push - push env vars to heroku'
    task :push do
      require 'json'

      # copy addons.json to temp .env
      if File.exist?('./addons.json')
        # parse ./addons.json
        services = JSON.parse(File.read('./addons.json'))

        # set environment variables for each service
        services.each do |service|
          service['env_vars'].each do |key, value|
            puts "adding environment variable #{key}"

            # add new vars to application.yml for the restart
            `heroku config:set #{key}=#{value}`
          end
        end
      end
    end
  end
end

