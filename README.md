# Strapi plugin generate-data

This plugin is for generating data for your content-types.

![Preview](./preview.jpg)

# Features

- It supports only `string`, `email`, `richtext`, `integer`, `decimal`, `date`, `media(videos, images, audios, files)`, `boolean` `enumeration`, `password`, `UID`, `relation`, `json` fields of your content types.
- Ability to publish data if you have draft mode for your type
- Ability of choosing which field should be included in generating data
- It has preview of data in table, which you want to upload
- Ability of flushing data of the content type you want to upload the generated data
- It creates content in draft if the content type has draft & publish option

# Installations

To install this plugin, you need to add an NPM dependency to your Strapi application:

```
# Using Yarn
yarn add strapi-plugin-generate-data

# Or using NPM
npm install strapi-plugin-generate-data

```

And then enable the plugin in config/plugins

```
{
    ...,
    "generate-data": {
        enabled: true,
    },
}
```

# Environment

- Strapi version 4.x.x

# Future plans

- Custom fields
- Dynamic zones
- Components
