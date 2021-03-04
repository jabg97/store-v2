<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class AlgorithmController extends Controller
{
    public function __construct()
    {
    }


    private function mult($x, $y)
    {
        $result = 0;
        for ($i = 0; $i < $y; $i++){
            $result += $x;
        }
        return $result;
    }

    private function calculate($x, $y)
    {
        $result = 1;
        for ($i = 0; $i < $y; $i++){
            $result = $this->mult($result, $x);
        }
        return $result;
    }


    private function insertionSort(&$sorted)
{
    $n = count($sorted);
    $current = null;
    for($i=1; $i<$n; $i++)
    {
        $current=$sorted[$i];
        for($j=$i-1; $j>=0; $j--)
        {
            if( $sorted[$j]>$current )
            {
                $sorted[$j+1]=$sorted[$j];
            }
            else
            {
                break;
            }
        }
        $sorted[$j+1]=$current;
 
    }
}

    public function sort(Request $request)
    {
        try {
     
            $unsorted = [];
            for($i = 0; $i < 99; $i++){
                $unsorted[] = mt_rand(1, 100);
            }
            $sorted = $unsorted;
            $this->insertionSort($sorted);

                return response()->json(['status' => 200, 'message' => "Arreglo ordenado.",
                 "unsorted"=>$unsorted, "sorted"=>$sorted]);
            
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function exp(Request $request)
    {
        try {
            $rules = array(
                'x' => 'numeric|required',
                'y' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {

                 $result = $this->calculate($request->x,$request->y);
    
                    return response()->json(['status' => 200, 'message' => "Exponente Calculado.",
                     "result"=>$result]);}
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

}
