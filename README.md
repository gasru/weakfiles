# weakfiles
Аудит файлов на Диске Гугл

​​Ищем доступные по ссылке документы (включая Таблицы) на Google Диске перед тем, как их найдут другие.

Друзья, привет! Пост написан по мотивам недавней истории с документами Google Диска, попавшими в индексацию.

Мы подготовили для вас специальную Таблицу. Скрипт в Таблице "[Ищем наши док-ты, открытые всем | https://t.me/google_sheets]" найдет на вашем Google Диске все файлы с формой доступа:
- anyoneCanFind (индексируется)
- anyoneWithLink (потенциально может индексироваться)

Как это работает:
1. Сделайте копию нашей Таблицы "[Ищем наши док-ты, открытые всем | https://t.me/google_sheets]" (файл>создать копию)
1. Запустите скрипт из меню Скрипты ↓↓ (посмотреть код можно открыв инструменты>редактор скриптов в Таблице)
1. Скрипт выведет на лист все ваши потенциально индексируемые файлы и ссылки на них. Особенно стоит обратить внимание на форму доступа "anyoneCanFind"—это ваши документы, которые можно найти через поисковики.
1. Кол-во документов для вывода ограничено 300, если вам не хватит—измените цифру в пятой строке коде. Но, не забывайте, что у GAS скриптов есть суточные квоты и на вывод несколько тысяч документов их может не хватить :)


[Ищем наши док-ты, открытые всем | https://t.me/google_sheets]: https://docs.google.com/spreadsheets/d/1lz0J31OKSVoBXCWWTIVVmSHEdBRogdS_-yskC-5h5W4/edit?usp=sharing