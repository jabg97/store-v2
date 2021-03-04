<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function __construct()
    {
    }

    public function index()
    {
        try {
            $products = Product::join('users', 'users.id', '=', 'products.seller_id')
                ->select('products.id','products.seller_id','products.name','products.img','products.created_at', 'users.name AS user_name', 'users.profile')->orderBy('products.created_at', 'desc')->get();
            return response()->json(
                ['status' => 200, "products" => $products],
                200,
                [],
                JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
            );
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    public function query(Request $request)
    {
        try {
            $query = '%' . $request->get('query') . '%';
            $products = Product::join('users', 'users.id', '=', 'products.seller_id')
                ->select('products.id','products.seller_id','products.name','products.img','products.created_at', 'users.name AS user_name', 'users.profile')
                ->orderBy('products.created_at', 'desc')
                ->whereRaw('LOWER(products.name) LIKE ? ','%'.trim(mb_strtolower($query,"UTF-8")).'%')
                ->get();
            return response()->json(
                ['status' => 200, "products" => $products],
                200,
                [],
                JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
            );
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    public function info($id, $user)
    {
        try {
            $product = Product::join('users', 'users.id', '=', 'products.seller_id')
                ->select('products.id','products.reference','products.description',
                'products.seller_id','products.unit_value','products.name','products.img','products.created_at', 'users.name AS user_name', 'users.profile')
                ->where("products.id", "=", $id)->first();
            if (!$product) {
                return response()->json(array("status" => 500, "message" => "El producto no existe."));
            }

            if($user && $user != "" && $user != "null"){
            $more = Product::join('users', 'users.id', '=', 'products.seller_id')
                ->select('products.id','products.seller_id','products.name','products.img','products.created_at', 'users.name AS user_name')->where("products.seller_id", "=", $product->seller_id)->where("products.id", "<>", $product->id)->orderBy('products.created_at', 'desc')->limit(5)->get();
            $products = Product::join('users', 'users.id', '=', 'products.seller_id')
                ->select('products.id','products.seller_id','products.name','products.img','products.created_at', 'users.name AS user_name')->where("products.seller_id", "<>", $product->seller_id)->orderBy('products.created_at', 'desc')->limit(5)->get();
            $user = User::find($user);
        }else{
            $more = Product::join('users', 'users.id', '=', 'products.seller_id')
            ->select('products.id','products.seller_id','products.name','products.img','products.created_at', 'users.name AS user_name')->where("products.id", "<>", $product->id)->orderBy('products.created_at', 'desc')->get();
            $products = [];
            $user = null;
        }

        $comments = Comment::join('users', 'users.id', '=', 'comments.user_id')
        ->select('comments.id','comments.likes','comments.dislikes','comments.content','comments.user_id', 'users.name', 'users.profile')->whereNull('comments.parent_id')->where("comments.product_id", "=", $product->id)->get();
            return response()->json(["status" => 200, 
                "product" => $product, "more" => $more, "products" => $products, 'comments' => $comments,
                'comments_count' => $comments->count(), 'user' => $user], 200, [], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    public function update(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
                'reference' => 'required',
                'name' => 'required',
                'description' => 'required',
                'unit_value' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $product = Product::find($request->id);

                if (!$product) {
                    return response()->json(['status' => 500, 'message' => "El producto no existe."]);
                }
               

        
                    $product->reference = $request->reference;
            
                    $product->name = $request->name;
              
                    $product->unit_value = $request->unit_value;
 
                    $product->description = $request->description;
               

                if ($request->hasFile('img')) {
                    $file = $request->file('img');
                    $product->img = $request->seller_id . '_' . $file->getClientOriginalName();
                    $file->move(base_path('\public\img'), $product->img);
                    $product->img = $request->getSchemeAndHttpHost() . "/img/" . $product->img;
                }

                $product->save();
                return response()->json(['status' => 200, 'message' => "El producto \"" . $product->name . "\" ha sido actualizado.", 'product' => $product->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    public function delete(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $product = Product::find($request->id);

                if (!$product) {
                    return response()->json(['status' => 500, 'message' => "El producto no existe."]);
                }

                $product->delete();
                return response()->json(['status' => 200, 'message' => "El producto \"" . $product->name . "\" ha sido eliminado.", 'product' => $product->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    public function upload(Request $request)
    {
        try {
            $rules = array(
                'seller_id' => 'numeric|required',
                'reference' => 'required',
                'name' => 'required',
                'description' => 'required',
                'unit_value' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $product = new Product;

                $seller = User::find($request->seller_id);
                if (!$seller) {
                    return response()->json(['status' => 500, 'message' => "El usuario no existe."]);
                }
                $product->reference = $request->reference;
            
                    $product->name = $request->name;
              
                    $product->unit_value = $request->unit_value;
 
                    $product->description = $request->description;
                $product->seller()->associate($seller);

                if (!$request->hasFile('img')) {
                    return response()->json(['status' => 500, 'message' => 'Seleccione una imagen.']);
                }

                $file = $request->file('img');
                $product->img = $request->seller_id . '_' . $file->getClientOriginalName();
                $file->move(base_path('\public\img'), $product->img);

                //$product->url = str_replace("http://", "https://",$request->getSchemeAndHttpHost())."/api/product/stream/".$product->url;
                $product->img = $request->getSchemeAndHttpHost() . "/img/" . $product->img;
                $product->save();
                return response()->json(['status' => 200, 'message' => "El producto \"" . $product->name . "\" ha sido registrado.", 'product' => $product->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }
}
