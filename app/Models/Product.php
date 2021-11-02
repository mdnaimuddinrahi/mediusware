<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use \Awobaz\Compoships\Compoships;
    protected $fillable = [
        'title', 'sku', 'description'
    ];

    public function getPost($request)
    {
        if ($request->has(['title', 'variant', 'created_at', 'price_from', 'price_to'])) {
            $input = array_filter($request->all());
            if ((!empty($input['price_from']) || !empty($input['price_to'])) && !empty($input['variant'])) {
                dd('3pro');
            } else if (!empty($input['price_from']) || !empty($input['price_to'])) {
                dd('2 pro');
            } else if (!empty($input['variant'])) {
                // $variant['variant'] = $input['variant'];
                $products = $this->productVariantName($input);
                dd($products);
            } else if (!empty($input['created_at']) && !empty($input['title'])) {
                $products = $this->whereDate('created_at', $input['created_at'])->where('title', $input['title'])->paginate(2);
            } else if (!empty($input['created_at'])) {
                $products = $this->whereDate('created_at', $input['created_at'])->paginate(2);
            } else {
                $products = $this->where($input)->paginate(2);
            }
        } else {
            $products = $this->with('productVariants', 'productVariantsPrice')->paginate(2);
        }
        return $products;
    }

    public function productVariantName($variant)
    {
        return $this->with(['productVariants' => function ($query) use ($variant) {
            $query->whereIn($variant, [1, 3]);
        }, 'productVariantsPrice'])->paginate();
    }

    // public function filterPage()
    // {
    //     if(request()->query) {
    //         // $data = request()->query;
    //         $data = request()->all();
    //         $objData = json_decode($data['query']);// convert string into object
    //         $arrData = (array)$objData; //convert object into array
    //         $result = array_filter($arrData); //remove empty value in array
    //         // dd($result);

    //         if($arrData['start_price'] && empty($arrData['end_price'])) {
    //             // echo "start price";
    //             // print_r($result['start_price']);
    //             unset($result['start_price']);
    //             // dd($result);
    //             return $this->where($result)->where('price_per_unit','>=',$arrData['start_price'])->paginate(6);
    //             // exit;
    //         } else if($arrData['end_price'] && empty($arrData['start_price'])) {
    //             // echo "end price";
    //             // print_r($result['end_price']);
    //             // exit;
    //             unset($result['end_price']);
    //             return $this->where($result)->where('price_per_unit','<=',$arrData['end_price'])->paginate(6);

    //         } else if($arrData['start_price'] && $arrData['end_price']) {
    //             // echo "find both";
    //             // exit;
    //             unset($result['start_price']);
    //             unset($result['end_price']);
    //             // return $this->where($result)->where('price_per_unit','BETWEEN',$arrData['start_price'],'AND',$arrData['end_price'])->paginate(6);
    //             return $this->where($result)->whereBetween('price_per_unit', [$arrData['start_price'], $arrData['end_price']])->paginate(6);

    //         } else {
    //             // dd($result);
    //             return $this->where($result)->paginate(6);

    //         }
    //         return $this->where($result)->paginate(6);
    //     }
    // }

    public function productVariants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function productVariantsPrice()
    {
        return $this->hasMany(ProductVariantPrice::class);
    }
}
