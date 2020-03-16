<?php

namespace App\Http\Requests;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rulesThumbnail = 'bail|required|image';
        if(!empty($this->id)) {
            $rulesThumbnail = 'bail|image';
        }
        return [
            'title' => 'bail|required|max:255',
            'status' => 'bail|in:0,1',
            'thumbnail' => $rulesThumbnail
        ];
    }
    /**
     * Get the error messages that apply to the request parameters.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'Tiêu đề không được để trống',
            'title.max' => 'Tiêu đề không được quá 255 ký tự',
            'status.in' => 'Trạng thái không đúng định dạng',
            'thumbnail.required' => 'Ảnh phải được tải lên',
            'thumbnail.image' => 'Ảnh tải lên không đúng định dạng'
        ];
    }
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                'errors' => $errors,
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
}
