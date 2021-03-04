<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Cart_detail;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function __construct()
    {
    }

    public function index($user)
    {
        try {
            $user = User::find($user);
            return response()->json(
                ['status' => 200, "details" => $this->get_details($user->cart->id)],
                200,
                [],
                JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
            );
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    private function get_details($cart_id){
        return Cart_detail::join('products', 'products.id', '=', 'carts_details.product_id')
        ->select('carts_details.id','products.name','products.unit_value', 'carts_details.quantity')->where("cart_id", "=", $cart_id)->orderBy('carts_details.created_at', 'desc')->get();
    }


    public function clear(Request $request)
    {
        try {
            $rules = array(
                'user_id' => 'numeric|required'
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {

                $user = User::find($request->user_id);
                if (!$user) {
                    return response()->json(['status' => 500, 'message' =>"El usuario no existe."]);
                }
                foreach ($user->cart->details as $key => $detail) {
                $detail->delete();
            }
                return response()->json(['status' => 200, 'message' => "El carrito ha sido limpiado.", "details"=>$this->get_details($user->cart->id)]);
          
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function add(Request $request)
    {
        try {
            $rules = array(
                'user_id' => 'numeric|required',
                'product_id' => 'numeric|required'
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $product = Product::find($request->product_id);
                if (!$product) {
                    return response()->json(['status' => 500, 'message' =>"El product no existe."]);
                }

                $user = User::find($request->user_id);
                if (!$user) {
                    return response()->json(['status' => 500, 'message' =>"El usuario no existe."]);
                }

                $cart = $user->cart;
                $detail = Cart_detail::where("cart_id", "=", $cart->id)
                ->where("product_id", "=", $product->id)->first();
                if($detail){
                    $detail->quantity++;
                }else{
                    $detail = new Cart_detail;
                    $detail->quantity = 1;
                    $detail->cart()->associate($cart);
                    $detail->product()->associate($product);
                }
               
                $detail->save();

                return response()->json(['status' => 200, 'message' => "El producto has sido agregado.", "details"=>$this->get_details($cart->id)]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }
   
    public function del_item(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required'
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $detail = Cart_detail::find($request->id);

                if (!$detail) {
                    return response()->json(['status' => 500, 'message' =>"El producto no existe."]);
                }
                $cart_id = $detail->cart_id;
                $detail->delete();
                return response()->json(['status' => 200, 'message' => "El producto ha sido eliminado.", "details"=>$this->get_details($cart_id)]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function add_item(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $detail = Cart_detail::find($request->id);
                if (!$detail) {
                    return response()->json(['status' => 500, 'message' =>"El producto no existe."]);
                }

                $detail->quantity++;
                $detail->save();
                return response()->json(['status' => 200, 'message' => "+1.", "details"=>$this->get_details($detail->cart_id)]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function rem_item(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $detail = Cart_detail::find($request->id);
                if (!$detail) {
                    return response()->json(['status' => 500, 'message' =>"El producto no existe."]);
                }

                $detail->quantity--;
                $detail->save();
                return response()->json(['status' => 200, 'message' => "-1.", "details"=>$this->get_details($detail->cart_id)]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

}
