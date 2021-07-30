defmodule Homework.Merchants do
  @moduledoc """
  The Merchants context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Merchants.Merchant
  alias Homework.Transactions.Transaction

  @doc """
  Returns the list of merchants.

  ## Examples

      iex> list_merchants([])
      [%Merchant{}, ...]

  """
  def list_merchants(args) do
    Merchant
    |> filter_merchants(args)
    |> Repo.all
  end

  @doc """
  counts the total number of merchants matching the filters
  """
  def count(args) do
    Merchant
    |> filter_merchants(args)
    |> Repo.aggregate(:count)
  end

  def filter_merchants(query, args) when is_map(args) do
    args
    |> Enum.map(fn arg -> arg end)
    |> Enum.reduce(query, fn {k, v}, q -> filter_merchants(q, k, v) end)
  end

  defp filter_merchants(query, :name, name) do
    query |> where([m], ilike(m.name, ^"%#{name}%"))
  end

  defp filter_merchants(query, _k, _v), do: query

  @doc """
  Gets a single merchant.

  Raises `Ecto.NoResultsError` if the Merchant does not exist.

  ## Examples

      iex> get_merchant!(123)
      %Merchant{}

      iex> get_merchant!(456)
      ** (Ecto.NoResultsError)

  """
  def get_merchant!(id), do: Repo.get!(Merchant, id)

  @doc """
  Creates a merchant.

  ## Examples

      iex> create_merchant(%{field: value})
      {:ok, %Merchant{}}

      iex> create_merchant(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_merchant(attrs \\ %{}) do
    %Merchant{}
    |> Merchant.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a merchant.

  ## Examples

      iex> update_merchant(merchant, %{field: new_value})
      {:ok, %Merchant{}}

      iex> update_merchant(merchant, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_merchant(%Merchant{} = merchant, attrs) do
    merchant
    |> Merchant.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a merchant.

  ## Examples

      iex> delete_merchant(merchant)
      {:ok, %Merchant{}}

      iex> delete_merchant(merchant)
      {:error, %Ecto.Changeset{}}

  """
  def delete_merchant(%Merchant{} = merchant) do
    Repo.delete(merchant)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking merchant changes.

  ## Examples

      iex> change_merchant(merchant)
      %Ecto.Changeset{data: %Merchant{}}

  """
  def change_merchant(%Merchant{} = merchant, attrs \\ %{}) do
    Merchant.changeset(merchant, attrs)
  end

  @doc """
  Returns sum of transactions per merchant
  """
  def transactions(_args) do
    query = from m in Merchant,
      left_join: t in Transaction,
      on: m.id == t.merchant_id,
      group_by: m.id,
      select: { m, sum(t.amount)}
    
    Repo.all(query)
  end
end
