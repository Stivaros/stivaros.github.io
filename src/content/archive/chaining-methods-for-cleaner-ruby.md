---
title: "Chaining Methods for Cleaner Ruby"
date: "2023-07-28T07:40:43.460Z"
originalUrl: "https://blog.stivaros.com/chaining-methods-for-cleaner-ruby"
isLegacy: true
description: "Harnessing Ruby's expressive nature can lead to cleaner code"
---

> **Archive:** This post was originally published on the legacy blog at blog.stivaros.com. It is preserved here for historical reference and may no longer reflect current thinking.

## In Summary (tl;dr)

`tap` [(docs)](https://devdocs.io/ruby~3.2/kernel#method-i-tap) will take an object and pass it to a block. The original object is the return value.

`then` [(docs)](https://devdocs.io/ruby~3.2/kernel#method-i-then) will take an object and pass it into a block. The return value from the block is the overall return value.

Once you learn the difference, chaining these methods makes for code that wraps itself up nicely, making it easier to understand.

---
## Introduction

Ruby's `tap` and `then` methods are underused. You can chain them to perform additional actions or side effects on objects, leading to code that's easier to understand.

Depending on how you architect your app, you can also use them to reduce the number of callbacks in your models.

## The Power of `tap`

Let's say we create an `order` and want to send a confirmation email. This is simple enough with a callback:

```ruby
# callsite, anywhere in the codebase

def process_order(order_data)
  Order.create(order_data)
end

# app/models/order.rb
class Order < ApplicationRecord
  after_create :send_confirmation_email

  private

  def send_confirmation_email
    OrderMailer.order_confirmation(self).deliver_later
  end
end
```

Beyond the scope of this post, there's a strong argument against the use of callbacks.

Let's write this without the callback but without using `tap` yet:

```ruby
# callsite, anywhere in the codebase

def process_order(order_data)
  order = Order.create(order_data)
  OrderMailer.order_confirmation(order).deliver_later
  order
end
```

This is the "temporary variable sandwich smell" (the name may have just been made up - patent pending).

There's just a lot of _fluff_, isn't there? We've had to assign a variable to use it when sending a message to another object, before then leaving it hanging at the end as a return value.

This is a perfect use case for `tap`, here's a rewrite utilising the method:

```ruby
# callsite, anywhere in the codebase

def process_order(order_data)
  Order.create(order_data).tap do |order|
    OrderMailer.order_confirmation(order).deliver_later
  end
end
```

Like the previous example, this example still:

1. Creates the `order`
2. Passes the returned value from `Order.create` to the `OrderMailer` for processing
3. Disregards the value returned from the `OrderMailer`
4. Returns the `order` to the caller

Make no mistake, the code is the same length, but it's quicker to read (unless you carefully and lovingly read each `end`, you freak).

Out in the wild, there are no end of service objects which are basically over-exuberant `tap` blocks masquerading as classes with a single public method of `call`. Grim.

## What about `then`, then?

`then` is very similar, except it will return whatever the block returns.

Let's say we were calculating a sales price for an item within an order. We will begin without using `then`:

```ruby
def calculate_final_price(base_price, is_taxable, sales_tax_rate)
  price_after_tax = is_taxable ? apply_sales_tax(base_price, sales_tax_rate) : base_price

  apply_discount(price_after_tax)
end

private

def apply_sales_tax(price, sales_tax_rate)
  price + (price * sales_tax_rate / 100)
end

def apply_discount(price)
  price - (price * 0.1) # 10% discount
end
```

Some variant of this code sits in every Rails code base. Given the amount of times we've seen this shape of code, it's familiar, which makes it readable. Other than the temporary variable, it's not bad.

However, the "stepped" nature of the calculation is better revealed in the version using `then`.

```ruby
def calculate_final_price(base_price, is_taxable, sales_tax_rate)
  base_price
    .then { |price| is_taxable ? apply_sales_tax(price, sales_tax_rate) : price }
    .then { |price_after_tax| apply_discount(price_after_tax) }
end

# same private methods, snipped for brevity
```

In this example, a couple of things become clear:

1. We are starting with a `base_price` and performing actions on it
2. There are two "actions" performed on the `base_price` to achieve the final result

We can also see the use case for `then` differentiate itself from `tap`. We are relying on `then` to return the value from the first block to provide the `price_after_tax` for the second block. If we were to have used `tap`, we would have had `base_price` returned.

## Embrace Code Elegancy

In a nutshell, `tap` and `then` can improve your code by wrapping code up within blocks that mean something. With `tap`, you can perform actions on objects without affecting their return value, keeping your code neat and readable. `then` allows you to 'step' your operations, making it easy to follow the logical flow of your code.
