<!-- # Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Customer Table

```
Table customer {
  id id [pk]
  email varchar(32) [not null, unique]
  first_name varchar(32)
  last_name varchar(32) [not null]
  address varchar(64)
  city varchar(32)
  region varchar(32)
  postal_code char(12) [not null]
  country varchar(32)
}
```

## Product Table

```
Table product {
  id id [pk]
  description varchar(64) [not null]
  cost_price numeric(32, 2)
  sell_price numeric(32, 2)
  stock int [not null]
}
```

## Order Info Table

```
Table order_info {
  id id [pk]
  customer_id id [ref: > customer.id, not null]
  date_placed date [not null]
  date_shipped date
}
```

## Order Product Table

```
Table order_product {
  product_id id [ref: > product.id, not null]
  order_id id [ ref: > order_info.id, not null]
  quantity integer [not null]

  Indexes: {
    (product_id, order_id) [ name: 'order_product_index', unique ]
  }
}
``` -->
