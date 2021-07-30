defmodule HomeworkWeb.Schema do
  @moduledoc """
  Defines the graphql schema for this project.
  """
  use Absinthe.Schema

  import HomeworkWeb.Helpers

  alias HomeworkWeb.Resolvers.MerchantsResolver
  alias HomeworkWeb.Resolvers.TransactionsResolver
  alias HomeworkWeb.Resolvers.UsersResolver
  alias HomeworkWeb.Resolvers.CompaniesResolver
  import_types(HomeworkWeb.Schemas.Types)

  object :paginated_transactions do
    field :data, list_of(:transaction)
    field :total_rows, :integer
  end

  object :paginated_users do
    field :data, list_of(:user)
    field :total_rows, :integer
  end

  object :paginated_merchants do
    field :data, list_of(:merchant)
    field :total_rows, :integer
  end

  object :paginated_companies do
    field :data, list_of(:company)
    field :total_rows, :integer
  end

  object :merchant_transactions do
    field :merchant, :merchant
    field :transactions_sum, :integer
  end

  query do
    @desc "Get all Transactions"
    field(:transactions, :paginated_transactions) do
      arg :min, :integer
      arg :max, :integer
      arg :company_id, :id
      pagination_args()
      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Get all Users"
    field(:users, :paginated_users) do
      arg :first_name, :string
      arg :last_name, :string
      pagination_args()
      resolve(&UsersResolver.users/3)
    end

    @desc "Get User by ID"
    field(:user, :user) do
      arg :id, non_null(:id)
      pagination_args()
      resolve(&UsersResolver.user/3)
    end

    @desc "Get all Merchants"
    field(:merchants, :paginated_merchants) do
      arg :name, :string
      pagination_args()
      resolve(&MerchantsResolver.merchants/3)
    end

    @desc "Get all Companies"
    field(:companies, :paginated_companies) do
      pagination_args()
      resolve(&CompaniesResolver.companies/3)
    end

    @desc "Get transaction by merchants"
    field(:tx_merchants, list_of(:merchant_transactions)) do
      resolve(&MerchantsResolver.transactions/3)
    end
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
    import_fields(:company_mutations)
  end
end
