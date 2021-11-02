<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use \Awobaz\Compoships\Compoships;
    public function productVariants()
    {
        return $this->belongsTo(Product::class);
    }
}
