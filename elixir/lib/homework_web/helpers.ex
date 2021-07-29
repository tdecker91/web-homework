defmodule HomeworkWeb.Helpers do
  @moduledoc """
  Helper methods
  """

  import Ecto.Query, warn: false

  defmacro pagination_args() do
    quote do
      arg :limit, :integer, default_value: 100
      arg :skip, :integer, default_value: 0
    end
  end

  def paginate_query(query, args) when is_map(args) do
    args
    |> Enum.map(fn arg -> arg end)
    |> Enum.reduce(query, fn {k, v}, q -> paginate_query(q, k, v) end)
  end

  def paginate_query(query, :limit, page_size) do
    query |> limit(^page_size)
  end

  def paginate_query(query, :skip, page_offset) do
    query |> offset(^page_offset)
  end

  def paginate_query(query, _key, _value), do: query
end