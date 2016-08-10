herokuenv=''

if [ -z $1 ] ; then
	herokuenv='dev'
else
	herokuenv=$1
fi

#dropdb somosport_core && heroku pg:pull -a ss-core-$herokuenv DATABASE_URL somosport_core
heroku pg:backups capture -a ss-core-$herokuenv &&
curl -o latest.dump `heroku pg:backups public-url -a ss-core-$herokuenv` &&
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d somosport_core latest.dump
