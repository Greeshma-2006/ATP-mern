import { useForm } from "react-hook-form";

//add article form with react hook form
function AddArticle() {
  const { register, handleSubmit, formState:{errors} } = useForm();

  const onAddArticle = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit(onAddArticle)} className="bg-gray-200 p-10 w-96">

        <h1 className="text-3xl text-center mb-5">Add Article</h1>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-3"
          {...register("title",{required:true})}
        />
        {errors.title && <p className="text-red-500">Title required</p>}

        <select
          className="border p-2 w-full mb-3"
          {...register("category",{required:true})}
        >
          <option value="">Select Category</option>
          <option value="technology">Technology</option>
          <option value="education">Education</option>
          <option value="sports">Sports</option>
        </select>
        {errors.category && <p className="text-red-500">Category required</p>}

        <textarea
          placeholder="Content"
          className="border p-2 w-full mb-5"
          rows="5"
          {...register("content",{required:true})}
        ></textarea>
        {errors.content && <p className="text-red-500">Content required</p>}

        <button className="bg-sky-500 text-white px-6 py-2 w-full">
          Publish Article
        </button>
      </form>
    </div>
  );
}

export default AddArticle;



