  # build for broduction
  yarn production

  # deploy
  rsync -avzt -e 'ssh -p 2200' ./dist/ aviasales-more:/var/www/more/data/www/more.aviasales.ru
