<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = [
        'title', 'description'
    ];

    public function getVariant()
    {
        $variants = $this->with('variant')->get();
        $vdata = array();
        foreach ($variants as $vdata) {
            $vdata['variantData'] = $vdata->variant->unique('variant');
        }
        return $variants;
    }

    public function variant()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
