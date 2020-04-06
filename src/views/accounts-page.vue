<template>
  <div class="hero-body">
    <modal
      :component="modalComp"
      :payload="selectedUser"
      @exitModal="closeModal"
    />

    <div class="container">
      <p v-if="!isEmpty">Number of accounts: {{ this.accounts.length }}</p>
      <br >
      <b-table
        :data="accounts"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :checkable="isCheckable"
        :loading="isLoading"
        :mobile-cards="hasMobileCards"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :detailed="isDetailed"
        :checked-rows.sync="checkedRows"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" sortable numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="firstName" label="First Name" sortable>
            {{ props.row.firstName }}
          </b-table-column>

          <b-table-column field="emailAddress" label="Email Address" sortable>
            {{ props.row.emailAddress }}
          </b-table-column>

          <b-table-column field="isVerified" label="Role" sortable>
            {{ props.row.userRole }}
          </b-table-column>

          <b-table-column
            field="modifiedTime"
            label="Modified Date"
            sortable
            centered
          >
            <span class="tag is-info">
              {{ props.row.modifiedTime | localDate }}
            </span>
          </b-table-column>

          <b-table-column
            field="createdTime"
            label="Created Date"
            sortable
            centered
          >
            <span class="tag is-info">
              {{ props.row.createdTime | localDate }}
            </span>
          </b-table-column>

          <b-table-column>
            <button
              class="button is-small is-info is-outlined"
              @click="openEditModal(props.row)"
            >
              Edit
            </button>
          </b-table-column>
        </template>

        <div slot="empty" class="has-text-centered">
          Loading Accounts
        </div>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accounts",
  components: {},
  mixins: [],
  data() {
    return {
      accounts: [],
      checkedRows: [],
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isCheckable: false,
      isEmpty: true,
      isLoading: true,
      isDetailed: false,
      hasMobileCards: false,
      isPaginated: false,
      isPaginationSimple: false,
      perPage: 20,
      modalComp: null,
      selectedUser: {},
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.updateLocalData()
  },
  mounted() {},
  computed: {},
  methods: {
    openEditModal(userData) {
      this.selectedUser = userData
      this.modalComp = () => import("@/components/admin-edit-user")
    },
    closeModal(madeChanges) {
      this.selectedUser = {}
      this.modalComp = null
      if (madeChanges) {
        this.updateLocalData()
      }
    },
    updateLocalData() {
      this.$accountAPI
        .getAccounts()
        .then((users) => {
          this.isLoading = false
          this.isEmpty = false
          this.accounts = users
          this.isPaginated = users.length > this.perPage ? true : false
        })
        .catch(() => {
          this.isLoading = false
          this.$buefy.snackbar.open({
            duration: 2000,
            message: "An error occured. Please try again",
            position: "is-top",
            type: "is-warning",
          })
        })
    },
  },
  filters: {
    localDate: function (date) {
      return new Date(date).toLocaleDateString()
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.selectedUser = {}
    this.modalComp = null
  },
}
</script>

<style lang="scss" scoped>
#editAccForm {
  display: flex;
  flex-direction: row;
  input {
    max-width: 200px;
    margin-right: 10px;
  }
}

button {
  display: inline;
}
</style>
