Speed-markup
============

 - [In english](#en)
 - [По-русски](#ru)

## About project<a name="en"></a>

Preconfigured **node.js + gulp** environment to automate routine markup tasks.

## Key features

 - **HTML & server**:
  - Ability to reuse blocks (eg, *header*, *footer*) using *ejs* template engine.
  - Automatic page reload when changing *html*, *less*, *js* files.
 - **CSS**:
  - *LESS* preprocessor.
  - *Autoprefixer* postprocessor.
  - *CSS* minifier.
 - **Images**:
  - Automatic sprites generation.
  - Automatic inline images generation (in *base64*).
  - Automatic images optimization.
 - **Javascript**:
  - Automatic *js* files concatinating.
  - Support for a modular architecture.
  - Minification of resulted *js* file.

## Using

First you need to install the required dependencies:

    npm install
    bower install

Once the dependencies are installed, you can run the server using command

    gulp

Will be completed the initial setup (less and js concatinating, sprite and base64 generation), will be launched *livereload*-server and the project start page will be automatically opens in the browser. Further, page will be updated automatically on any changes in *html*, *less* or *js* files.

-----------

## О проекте<a name="ru"></a>

Преднастроенное **node.js + gulp** окружение для автоматизации рутинных задач при верстке новых проектов.

## Основные особенности

 - **HTML & сервер**:
  - Возможность переиспользования блоков (например, *header*, *footer*) при помощи *ejs*-шаблонизатора.
  - Автоматическая перезагрузка страницы при изменении *html*, *less*, *js* файлов.
 - **CSS**:
  - Препроцессор *LESS*.
  - Постпроцессор *autoprefixer*.
  - Минификатор *CSS*.
 - **Картинки**:
  - Автоматическая генерация спрайтов.
  - Автоматическая генерация inline-картинок (в *base64*).
  - Автоматическая оптимизация изображений.
 - **Javascript**:
  - Автоматическое склеивание *js*-файлов.
  - Поддержка модульной архитектуры.
  - Минификация склееного *js*-файла.

## Использование

Для начала нужно установить необходимые зависимости:

    npm install
    bower install

После того, как зависимости будут установлены, можно запускать сервер командой

    gulp

Будет выполнена первоначальная настройка (склейка less и js, генерация спрайта и base64), будет запущен *livereload*-сервер и автоматически в браузере откроется стартовая страница проекта. Далее при любых изменениях html, less или js файлов страница будет обновляться автоматически.

> Developed by [alvik48](http://vk.com/a_kryuchkov).