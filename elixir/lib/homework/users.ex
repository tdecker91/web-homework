defmodule Homework.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  import HomeworkWeb.Helpers
  alias Homework.Repo

  alias Homework.Users.User

  @doc """
  Returns the list of users. Can search by first or last name

  ## Examples

      iex> list_users([])
      [%User{}, ...]

      iex> list_users([{first_name: "tys"}])
      [%User{ first_name: tyson, last_name: decker}]

      iex> list_users([{last_name: "deck"}])
      [%User{ first_name: tyson, last_name: decker}, %User{ first_name: steele, last_name: decker}]

  """
  def list_users(args) do
    User
    |> filter_users(args)
    |> paginate_query(args)
    |> Repo.all
  end

  @doc """
  counts the total number of users matching the filters
  """
  def count(args) do 
    User
    |> filter_users(args)
    |> Repo.aggregate(:count)
  end

  def filter_users(query, args) when is_map(args) do
    args
    |> Enum.map(fn arg -> arg end)
    |> Enum.reduce(query, fn {k, v}, q -> filter_users(q, k, v) end)
  end

  defp filter_users(query, :first_name, name) do
    query |> where([u], ilike(u.first_name, ^"%#{name}%"))
  end

  defp filter_users(query, :last_name, name) do
    query |> where([u], ilike(u.last_name, ^"%#{name}%"))
  end

  defp filter_users(query, _k, _v), do: query

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end
