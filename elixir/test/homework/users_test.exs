defmodule Homework.UsersTest do
  use Homework.DataCase

  alias Homework.Users
  alias Homework.Companies

  describe "users" do
    alias Homework.Users.User

    setup do
      {:ok, company} = Companies.create_company(%{name: "company", credit_line: 1000000, available_credit: 1000000})

      {:ok,
       %{
         company_id: company.id
       }}
    end

    @valid_attrs %{dob: "some dob", first_name: "some first_name", last_name: "some last_name"}
    @update_attrs %{
      dob: "some updated dob",
      first_name: "some updated first_name",
      last_name: "some updated last_name"
    }
    @invalid_attrs %{dob: nil, first_name: nil, last_name: nil, company_id: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/1 returns all users", %{company_id: company_id} do
      user = user_fixture(%{company_id: company_id})
      assert Users.list_users(%{}) == [user]
    end

    test "list_users/1 searches users by first name", %{company_id: company_id} do
      user1 = user_fixture(%{first_name: "user1", last_name: "last1", company_id: company_id})
      user2 = user_fixture(%{first_name: "user2", last_name: "last1", company_id: company_id})
      user3 = user_fixture(%{first_name: "user3", last_name: "last1", company_id: company_id})

      assert Users.list_users(%{first_name: "user1"}) == [user1]
      assert Users.list_users(%{first_name: "user2"}) == [user2]
      assert Users.list_users(%{first_name: "user3"}) == [user3]
      assert length(Users.list_users(%{first_name: "user"})) == 3
    end

    test "list_users/1 searches users by last name", %{company_id: company_id} do
      user1 = user_fixture(%{first_name: "user1", last_name: "last2", company_id: company_id})
      user2 = user_fixture(%{first_name: "user2", last_name: "last3", company_id: company_id})
      user3 = user_fixture(%{first_name: "user3", last_name: "last4", company_id: company_id})

      assert Users.list_users(%{last_name: "last2"}) == [user1]
      assert Users.list_users(%{last_name: "last3"}) == [user2]
      assert Users.list_users(%{last_name: "last4"}) == [user3]
      assert length(Users.list_users(%{last_name: "last"})) == 3
    end

    test "get_user!/1 returns the user with given id", %{company_id: company_id} do
      user = user_fixture(%{company_id: company_id})
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user", %{company_id: company_id} do
      assert {:ok, %User{} = user} = Users.create_user(%{company_id: company_id} |> Enum.into(@valid_attrs))
      assert user.dob == "some dob"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user", %{company_id: company_id} do
      user = user_fixture(%{company_id: company_id})
      attrs = %{company_id: company_id} |> Enum.into(@update_attrs)
      assert {:ok, %User{} = user} = Users.update_user(user, attrs)
      assert user.dob == "some updated dob"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
    end

    test "update_user/2 with invalid data returns error changeset", %{company_id: company_id} do
      user = user_fixture(%{company_id: company_id})
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user", %{company_id: company_id} do
      user = user_fixture(%{company_id: company_id})
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset", %{company_id: company_id} do
      user = user_fixture(%{company_id: company_id})
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
