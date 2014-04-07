#!/usr/bin/env ruby

namespace :addons do
  namespace :heroku do
    desc 'addons:heroku:push - push env vars to heroku'
    task :push do
      require 'fileutils'
      require 'json'

      # backup .env to .env.original
      if File.exist?('./.env')
        FileUtils.mv('./.env', './.env.original')
      end

      # copy addons.json to temp .env
      if File.exist?('./addons.json')
        # parse ./addons.json
        services = JSON.parse(File.read('./addons.json'))

        # make ./.env, add each addon to it
        # NOTE: 'w' overwrites the previous file!
        File.open('./.env', 'w') do |file|
          # set environment variables for each service
          services.each do |service|
            service['env_vars'].each do |key, value|
              puts "adding environment variable #{key}"

              # add new vars to application.yml for the restart
              file.puts "#{key}=#{value}"
            end
          end
        end

        # run `heroku config:push`
        puts "pushing env vars to heroku"
        `heroku config:push`
      end

      # remove temp ./.env
      if File.exist?('./.env')
        FileUtils.rm('./.env')
      end

      # replace .env with .env.original
      if File.exist?('./.env.original')
        FileUtils.mv('./.env.original', './.env')
      end
    end
  end
end

