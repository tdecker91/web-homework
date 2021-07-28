defmodule HomeworkWeb.Resolvers.UsersResolver do
  alias Homework.Users

  @doc """
  Get a list of users
  """
  def users(_root, args, _info) do
    data = Users.list_users(args)
    total_rows = Users.count(args)

    {:ok, %{
      data: data,
      total_rows: total_rows
    }}
  end

  @doc """
  Get user by id
  """
  def user(_root, args, _info) do
    user = args
    |> Map.fetch!(:id)
    |> Users.get_user!

    {:ok, user}
  end

  @doc """
  Creates a user
  """
  def create_user(_root, args, _info) do
    case Users.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not create user: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a user for an id with args specified.
  """
  def update_user(_root, %{id: id} = args, _info) do
    user = Users.get_user!(id)

    case Users.update_user(user, args) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not update user: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a user for an id
  """
  def delete_user(_root, %{id: id}, _info) do
    user = Users.get_user!(id)

    case Users.delete_user(user) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not update user: #{inspect(error)}"}
    end
  end
end
