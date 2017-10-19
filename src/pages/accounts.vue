<template>
  <div class="hero-body">
    <div class="container">
      <p> Number of accounts: {{ this.accounts.length }}</p>
      <br>
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
        :selected.sync="selected"
        :detailed="isDetailed"
        :checked-rows.sync="checkedRows">

        <template>
          <b-table-column field="id" label="ID" width="40" sortable numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="firstName" label="First Name" sortable>
            {{ props.row.firstName }}
          </b-table-column>

          <b-table-column field="emailAddress" label="Email Address" sortable>
            {{ props.row.emailAddress }}
          </b-table-column>

          <b-table-column field="isValidated" label="Role" sortable>
            {{ props.row.userRole }}
          </b-table-column>

          <b-table-column field="modifiedDate" label="Modified Date" sortable centered>
            <span class="tag is-info">
              {{ new Date(props.row.modifiedDate).toLocaleDateString() }}
            </span>
          </b-table-column>

          <b-table-column field="createdDate" label="Created Date" sortable centered>
            <span class="tag is-info">
              {{ new Date(props.row.createdDate).toLocaleDateString() }}
            </span>
          </b-table-column>

        </template>

        <template slot="detail">

          <div class="content">
            <p>
              UUID: {{ props.row.UUID }}
            </p>

            <p>
              Validated: {{ props.row.isValidated }}
            </p>

            <!-- <form @submit.prevent="editAcc(props.row)" id="editAccForm">
                
                <b-field label="First Name">
                  <b-input type="text" v-model="props.row.firstName">
                  </b-input>
                </b-field>
                
                <b-field label="Last Name">
                  <b-input type="text" v-model="props.row.lastName">
                  </b-input>
                </b-field>

                <b-field label="Email">
                  <b-input type="text" v-model="props.row.emailAddress">
                  </b-input>
                </b-field>

                <b-field label="Phone">
                  <b-input type="text" v-model="props.row.phoneNumber">
                  </b-input>
                </b-field>

                <b-field label="Role">
                  <b-input type="text" v-model="props.row.userRole">
                  </b-input>
                </b-field>

               
              </form> -->
          </div>
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
  name: 'accounts',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      accounts: [],
      checkedRows: [],
      selected: {},
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isCheckable: false,
      isEmpty: true,
      isLoading: true,
      isDetailed: true,
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: false,
      perPage: 20
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.$account.getAccounts().then(res => {
      this.isLoading = false
      this.isEmpty = false
      this.accounts =res.data.Users // sort by id
    })
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    clearSelected () {
      this.selected = {}
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  }
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
